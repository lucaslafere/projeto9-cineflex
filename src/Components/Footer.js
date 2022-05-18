export default function Footer ({img, title}) {
    return (
        <div className="footer">
            <div className="footer-img-box">
                <img src={img} alt={title} />
            </div>
            <h3>{title}</h3>
        </div>
    )
}