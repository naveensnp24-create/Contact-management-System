const Header=()=>{
    return(
        <header className="w-full bg-slate-900 text-white shadow-lg sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold text-blue-400">Nambii vangaa sandhosama pongaa!!</div>
                <div className="flex gap-8 items-center">
                    <a href='/' className="hover:text-blue-400 transition-colors">Home</a>
                    <a href='/products' className="hover:text-blue-400 transition-colors">Products</a>
                    <a href="/about" className="hover:text-blue-400 transition-colors">About</a>
                    <a href="/contact" className="hover:text-blue-400 transition-colors">Contact</a>
                    <a href="/Cart" className="hover:text-blue-400 transition-colors">Cart</a>
                    <a href="/Orders" className="hover:text-blue-400 transition-colors">Orders</a>
                    <a href="/login" className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Login</a>
                </div>
            </nav>
        </header>
    )
}

export default Header