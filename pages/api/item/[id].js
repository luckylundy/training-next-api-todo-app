import connectDB from "../../../utils/database";
import { ItemModel } from "../../../utils/schemaModels";

const getSingleItem = async (req, res) => {
  try {
    await connectDB();
    const singleItem = await ItemModel.findById(req.query.id);
    return res
      .status(200)
      .send({
        message: "アイテム読み込み成功（シングル）",
        singleItem: singleItem,
      });
  } catch (err) {
    return res
      .status(400)
      .send({ message: "アイテム読み込み失敗（シングル）" });
  }
};

export default getSingleItem;
