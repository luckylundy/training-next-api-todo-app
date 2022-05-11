import jwt from "jsonwebtoken";

const secret_key = "nextmarket";

const auth = (handler) => {
  return async (req, res) => {
    //GETリクエストの場合はauthを通す必要がないので処理を終了する
    if (req.method === "GET") {
      return handler(req, res);
    }
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvQG1vbm90ZWluLmNvbSIsImlhdCI6MTY1MjI1MTUyNywiZXhwIjoxNjUyMzM0MzI3fQ.vlgc3P3L9UKsxhMAPd67seV4Q4I-Dno_aVghcnHD-Y4";
    //トークンの取得ができるまで処理が進まないようawaitを使う
    // const token = await req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "トークンがありません" });
    }

    try {
      const decoded = jwt.verify(token, secret_key);
      req.body.email = decoded.email;
      return handler(req, res);
    } catch (err) {
      return res
        .status(401)
        .json({ message: "トークンが正しくないので、ログインしてください" });
    }
  };
};

export default auth;
