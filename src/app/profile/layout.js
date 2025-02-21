export default function ProfileLayout({ children }) {
  return (
    <div>
      <h1>Profile header</h1>
      {children}
      <h1>Profile footer</h1>
    </div>
  );
}