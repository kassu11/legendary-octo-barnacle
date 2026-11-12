import { splitProps } from "solid-js";


export function useDataElement() {

  const key = Symbol("data");

  function DataElement(props) {
    const [local, other] = splitProps(props, ["data", "class"]);

    const handleRef = elem => {
      elem[key] = local.data;
    };

    return (
      <div {...other} classList={{ "data-element": true, [local.class]: !!local.class }} ref={handleRef} />
    );
  }

  return [key, DataElement];

}

