const UserDetail = ({ params }: { params: string }) => {
  return <h1>User Detail {params.userId}</h1>;
};

export default UserDetail;
