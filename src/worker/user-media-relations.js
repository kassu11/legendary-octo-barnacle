onmessage = ({ data: { data, ...filtering } }) => {
  modifyMediaListData(data, filtering);
}

function modifyMediaListData(listData, options) {

  if (options.search) {
    options.search = options.search.replace(/[#-.]|[[-^]|[?|{}]/g, "\\$&");

    if (options.search.trim() === "") {
      options.searchRegex = new RegExp(options.search, "i");
    } else if(options.search.match(/\W/)) {
      options.searchRegex = new RegExp(options.search.replace(/ +/g, "\\W"), "i");
    } else {
      options.searchRegex = new RegExp(options.search.split("").join("\\W?"), "i");
    }
  }

  const blackList = new Set();
  const relations = {};
  listData.lists.forEach(list => {
    list.entries.forEach(entry => {
      blackList.add(entry.media.id);

      if (!options.allowCompleted && entry.status === "COMPLETED") return;
      if (!options.allowCurrent && entry.status === "CURRENT") return;
      if (!options.allowDropped && entry.status === "DROPPED") return;
      if (!options.allowPaused && entry.status === "PAUSED") return;
      if (!options.allowPlanning && entry.status === "PLANNING") return;

      entry.media.relations.edges.forEach(edge => {
        // Skip summary movies / ovas. For example: https://anilist.co/anime/184694/Solo-Leveling-ReAwakening-/
        if (edge.relationType === "SUMMARY") {
          blackList.add(edge.node.id);
          return;
        }

        // Skip alternative versions. For example: https://anilist.co/anime/129874/Demon-Slayer-Kimetsu-no-Yaiba-Mugen-Train-Arc/
        if (edge.relationType === "ALTERNATIVE") {
          blackList.add(edge.node.id);
          return;
        }

        if (edge.relationType !== "SEQUEL" && edge.relationType !== "PREQUEL") return;
        if (options.matchFormat && edge.node.format !== "MOVIE" && edge.node.format !== entry.media.format) return;
        if (!options.allowNotYetReleased && edge.node.status === "NOT_YET_RELEASED") return;
        if (edge.node.status === "CANCELLED") return;

        relations[edge.node.id] = edge.node;
      });
    });
  });

  const data = [];
  Object.values(relations).forEach(entry => {
    if (blackList.has(entry.id)) return;
    if (filter({ media: entry }, options)) {
      data.push(entry);
    }
  });


  // const mediaSet = new Set();
  // const tagsSet = new Set();
  // const studiosSet = new Set();
  // listData.indecies = {};
  // listData.lists.forEach((list, i) => {
  //   let tail = 0;
  //   list.entries.forEach((entry, j, arr) => {
  //     listData.indecies[entry.media.id] ??= []
  //     listData.indecies[entry.media.id].push([i, j]);
  //     for (const studio of entry.media.studios.edges) {
  //       if (studio.isMain) {
  //         studiosSet.add(studio.node.name);
  //       } else {
  //         break;
  //       }
  //     }
  //     for (const tag of entry.media.tags) {
  //       if (tag.rank > 50) {
  //         tagsSet.add(tag.name);
  //       } else {
  //         break;
  //       }
  //     }
  //
  //     if (filter(entry, options)) {
  //       mediaSet.add(entry.media.id);
  //
  //       if (tail++ < j) {
  //         arr[tail - 1] = entry;
  //       }
  //     }
  //   });
  //
  //   list.entries.length = tail;
  // });
  // listData.total = mediaSet.size;
  // listData.studios = Array.from(studiosSet).sort();
  // listData.tags = Array.from(tagsSet).sort();

  const sortFunction = generateSortFunction(options.sort, options.reverse ? -1 : 1);
  data.sort(sortFunction);

  console.log("Size:", data.length);
  // postMessage(Array(50).fill(data).flat());
  postMessage(data);
}

function generateSortFunction(sort, direction = 1) {
  switch (sort) {
    case "title":
      return (a, b) => (sortFunctions.title(a, b) * direction) || sortFunctions.averageScore(a, b);
    case "format":
      return (a, b) => (sortFunctions.format(a, b) * direction) || sortFunctions.averageScore(a, b) || sortFunctions.title(a, b);
    case "averageScore":
      return (a, b) => (sortFunctions.averageScore(a, b) * direction) || sortFunctions.title(a, b);
    default:
      return (a, b) => (sortFunctions.averageScore(a, b) * direction) || sortFunctions.title(a, b);
  };
}

const sortFunctions = {
  "format": (a, b) => a.format.localeCompare(b.format),
  "title": (a, b) => a.title.userPreferred.localeCompare(b.title.userPreferred),
  "averageScore": (a, b) => (b.averageScore || 0) - (a.averageScore || 0),
}

function filter(entry, filterObject) {
  if (filterObject.searchRegex) search: {
    if ((entry.searchMatch = entry.media.title.userPreferred.match(filterObject.searchRegex))) { break search; }
    if ((entry.searchMatch = entry.media.title.native?.match(filterObject.searchRegex))) { break search; }
    if ((entry.searchMatch = entry.media.title.english?.match(filterObject.searchRegex))) { break search; }
    if ((entry.searchMatch = entry.media.title.romaji?.match(filterObject.searchRegex))) { break search; }
    if ((entry.searchMatch = entry.media.synonyms?.some(synonym => synonym.match(filterObject.searchRegex)))) { break search; }
    return false;
  }

  if (filterObject.format && entry.media.format !== filterObject.format) {
    return false;
  }
  if (filterObject.status && entry.media.status !== filterObject.status) {
    return false;
  }
  if (filterObject.countryOfOrigin && entry.media.countryOfOrigin !== filterObject.countryOfOrigin) {
    return false;
  }
  if (filterObject.year && entry.media.startDate?.year !== filterObject.year) {
    return false;
  }
  if (typeof filterObject.isAdult === "boolean" && entry.media.isAdult !== filterObject.isAdult) {
    return false;
  }
  if (filterObject.genre && entry.media.genres.every(genre => genre !== filterObject.genre)) {
    return false;
  }
  if (filterObject.userStatus && entry.status !== filterObject.userStatus) {
    return false;
  }
  if (filterObject.private && !entry.private) {
    return false;
  }
  if (filterObject.notes && !entry.notes) {
    return false;
  }
  if (filterObject.repeat && !(entry.repeat > 0)) {
    return false;
  }
  if (filterObject.missingStart && entry.startedAt?.year) {
    return false;
  }
  if (filterObject.missingScore && entry.score !== 0) {
    return false;
  }
  if (filterObject.studio) studio: {
    for (const studio of entry.media.studios.edges) {
      if (studio.isMain && studio.node.name === filterObject.studio) {
        break studio;
      }
    }
    return false;
  }
  if (filterObject.tag) tag: {
    for (const tag of entry.media.tags) {
      if (tag.rank > 50 && tag.name=== filterObject.tag) {
        break tag;
      }
    }
    return false;
  }

  return true;
}
