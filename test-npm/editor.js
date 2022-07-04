
let tools = require('visual-js-server');

let config = {
  VERSION : "3.0.0",
  PATH_OF_NODE_APP : "G:\\web_server\\xampp\\htdocs\\PRIVATE_SERVER\\visual-js-GIT\\build\\visualjs\\project\\server\\",
  PATH_OF_WWW : "G:\\web_server\\xampp\\htdocs\\PRIVATE_SERVER\\visual-js-GIT\\build\\visualjs\\project\\client\\",
  EDITOR_PORT : "1013",
  DESTROY_SESSION_AFTER_X_mSECUNDS : 20000,
  SELF_HOST: {
    protocol: 'http',
    port: 80
  }
};

tools.editor(config);
