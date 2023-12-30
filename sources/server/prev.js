server.post("/calculate", (req, res) => {
  const data = req.body;
  console.log("data", data);

  let { num1, num2, operation } = data;

  num1 = parseInt(num1);
  num2 = parseInt(num2);

  let result = 0;

  result = num1 + num2;

  res.send(result.toString());
});
