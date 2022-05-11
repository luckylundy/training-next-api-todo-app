import connectDB from "../../../../utils/database";
import { ItemModel } from "../../../../utils/schemaModels";
import auth from "../../../../utils/auth";

const updateItem = async (req, res) => {
  try {
    await connectDB();
    //モデルから該当するidで検索してアイテム情報を取得
    const singleItem = await ItemModel.findById(req.query.id);
    //取得したアイテムのidとauth.jsから渡されたリクエストのbodyに入っているemailが合致していれば更新できる
    if (singleItem.email === req.body.email) {
      await ItemModel.updateOne({ _id: req.query.id }, req.body);
      res.status(200).send({ message: "アイテム編集成功" });
    }
  } catch (err) {
    res.status(400).send({ message: "アイテム編集失敗" });
  }
};

export default auth(updateItem);
