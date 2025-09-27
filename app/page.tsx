export default function HomePage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Welcome to Trading Dashboard 🚀</h1>
            <p className="text-gray-600">
                این یک صفحه نمونه است. از Navbar و Sidebar برای ناوبری استفاده کنید.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 rounded-lg bg-white shadow">Card 1</div>
                <div className="p-4 rounded-lg bg-white shadow">Card 2</div>
                <div className="p-4 rounded-lg bg-white shadow">Card 3</div>
            </div>
        </div>
    );
}
