const Notification = ({ message, type, visible }) => {
    return (
        <div className={`notification ${type} ${visible ? 'visible' : ''}`}>
            {message}
        </div>
    );
};

export default Notification;