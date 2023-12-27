const sendMessageWithAnimation = (animationJSON) => {
  const { animationName, content } = JSON.parse(animationJSON);
  return { role: "assistant", content, animation: animationName };
};

export { sendMessageWithAnimation };
