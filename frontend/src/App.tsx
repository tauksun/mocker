import "./App.css";
import prettifyCode from "./functions/prettify";

const check = async () => {
  const { data, error } = await prettifyCode({
    code: `
console.log("chiba chiba");let a =    2
let b = 5  ;;
return a+b;
    `,
  });

  console.log({ error, data });
};

function App() {
  return (
    <>
      <div id="parent">
        <div id="main">
          <div id="title">Shadow Clone</div>
          <div id="body">
            <div>
              <button onClick={check}>Check..........</button>
            </div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
