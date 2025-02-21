async function takeTime() {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve('done');
    }, 3000);
  });
}

export default async function About() {
  await takeTime();
  throw new Error('something went wrong');
  return (
    <div>this is about page</div>
  );
}
