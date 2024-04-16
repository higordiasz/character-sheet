const connections = [];

const functions = {};

functions.update = async (name, variables) => {
  connections.forEach((con) => {
    con.write(`data: ${JSON.stringify({ name, variables })}\n\n`);
  });
  return;
};

export { connections, functions };
