function showMessageToUsers({ message }: { message: string }) {
    console.log({message})
  if (message) {
    alert(message);
  }
}

export default showMessageToUsers;
