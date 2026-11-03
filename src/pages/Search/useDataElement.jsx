import { splitProps } from "solid-js";


export function useDataElement() {

  const key = Symbol("data");

  function DataElement(props) {
    const [local, other] = splitProps(props, ["data"]);

    const handleRef = elem => {
      elem[key] = local.data;
    };

    return (
      <div {...other} ref={handleRef} />
    );
  }

  return [key, DataElement];

}

