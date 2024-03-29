import connectDB from "../../../../utils/database";
import { ItemModel } from "../../../../utils/schemaModels";
import auth from "../../../../utils/auth";

const deleteItem = async (req, res) => {
  try {
    await connectDB();
    const singleItem = await ItemModel.findById(req.query.id);
    if (singleItem.email === req.body.email) {
      await ItemModel.deleteOne({ _id: req.query.id });
      res.status(200).send({ message: "アイテム削除成功" });
    }
  } catch (err) {
    res.status(400).send({ message: "アイテム削除失敗" });
  }
};

export default auth(deleteItem);
