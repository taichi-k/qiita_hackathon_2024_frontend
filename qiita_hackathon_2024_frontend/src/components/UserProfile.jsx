/* eslint-disable */

export default function UserProfile( props ) {
    if (!props.user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <p className="font-bold">{props.user.nickname}</p>
            {props.user.interested_in?.split(",")?.map((interest) => {
                return <p>・{interest}</p>
            })}
            <p>Twitter: {props.user.twitter_id}</p>
        </div>
    )
}