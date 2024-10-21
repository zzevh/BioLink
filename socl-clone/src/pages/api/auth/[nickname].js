import User from '../models/User';
import dbConnect from '../utils/dbConnect';

export async function getServerSideProps(context) {
  const { nickname } = context.params;
  await dbConnect();

  const user = await User.findOne({ nickname });

  if (!user) {
    return {
      notFound: true,
    };
  }

  return {
    props: { nickname: user.nickname },
  };
}

export default function Profile({ nickname }) {
  return (
    <div>
      <h1>{nickname}'s Profile</h1>
      {/* Add more user profile details here */}
    </div>
  );
}
