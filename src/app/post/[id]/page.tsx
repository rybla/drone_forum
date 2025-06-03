export default function Post(props: { params: { id: string } }) {
  return <div>post id: {props.params.id}</div>;
}
