const takeTime = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Loading done!"); // Debug log
      resolve();
    }, 3000);
  });
};

export default async function About() {
  await takeTime();  // No error is thrown here
  return <div>About Page</div>;
}
