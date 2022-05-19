export default function Footer ({img, title, hour, day}) {
    return (
        <div className="footer">
            <div className="footer-img-box">
                <img src={img} alt={title} />
            </div>
            <h3>{title}</h3>
            <span>{day} - {hour}</span>
        </div>
    )
}