export default function UserProfile( props ) {
    return (
        <div>
            <p className="font-bold">{props.user.nickname}</p>
            {props.user.interested_in.split(",").map((interest) => {
                return <p>・{interest}</p>
            })}
            <p>Twitter: {props.user.twitter_id}</p>
        </div>
    )
}