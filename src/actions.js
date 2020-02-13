export const inc = () => "INC";
export const dec = () => ({ type: "DEC" });
export const rnd = () => {
  return {
    type: "RND",
    payload: Math.floor(Math.random() * 10)
  };
};
