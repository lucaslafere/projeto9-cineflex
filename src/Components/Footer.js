export default function Footer ({img, title, hour, day}) {
    return (
        <div className="footer">
            <div className="footer-img-box">
                <img src={img} alt={title} />
            </div>
            <div className="footer-text">
                <h3>{title}</h3>
                {day ? <p>{day} - {hour}</p> : ""}
                
            </div>
            
        </div>
    )
}