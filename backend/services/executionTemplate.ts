//@ts-nocheck
function templateCode({
  headers,
queryParams,
  pathParams,
  code,
  body
} ) {
  const template = `const process={}; const global={}; const userCode = ({headers,queryParams,pathParams,body}) => { const console = {}; ${(code && code.toString())}};const userCodeResult = userCode({headers:${JSON.stringify(headers)},queryParams:${JSON.stringify(queryParams)},pathParams:${JSON.stringify(pathParams)},body:${JSON.stringify(body)}}); console.log(JSON.stringify(userCodeResult));`;
  return template;
}

export default templateCode;
