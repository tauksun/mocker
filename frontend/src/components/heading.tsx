// @ts-nocheck
function Heading({ text, type }: { text: string; type: string }) {
  let heading = "";
  switch (type) {
    case "h1":
      heading = <h1>{text}</h1>;
      break;
    case "h2":
      heading = <h2>{text}</h2>;

      break;
    case "h3":
      heading = <h3>{text}</h3>;

      break;
    case "h4":
      heading = <h4>{text}</h4>;

      break;
    case "h5":
      heading = <h5>{text}</h5>;

      break;
    case "h6":
      heading = <h6>{text}</h6>;

      break;

    default:
      break;
  }
  return <>{heading}</>;
}

export default Heading;
