
function Toolbar() {
    return (
        <div className="toolbar-container d-flex justify-content-between align-items-center p-2">
            {/* Home button */}
            <button className="btn util-btn">Home</button>

            {/* Search field */}
            <input type="text" placeholder="Search..." />

            {/* Log in button */}
            <button className="btn util-btn">Log In</button>
        </div>
    )
}

export default Toolbar