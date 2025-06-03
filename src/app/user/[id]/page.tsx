export default function User(props: { params: { id: string } }) {
  return <div>user id: {props.params.id}</div>;
}
