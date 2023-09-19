//@ts-nocheck
function templateCode({
  headers,
  queryParmas,
  pathParams,
  code,
} ) {
  const template = `const process = {}; const userCode = ({headers,queryParmas,pathParams,}) => {${(code && code.toString())}};const userCodeResult = userCode({headers:${JSON.stringify(headers)},queryParmas:${JSON.stringify(queryParmas)},pathParams:${JSON.stringify(pathParams)},}); console.log(userCodeResult);`;
  return template;
}

export default templateCode;
