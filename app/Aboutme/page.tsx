export default function AboutMe() {
    return (
        <main className="px-4 md:px-8 py-10">
            <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-[1fr,280px] lg:gap-12">
                {/* Main content (image + CV) */}
                    {/* image + text */}
                    <div className="flex flex-col md:flex-row md:items-center gap-8 mb-10">
                        <div className="flex-shrink-0">
                            <div className="relative w-40 h-40 rounded-full ring-4 ring-emerald-200 overflow-hidden shadow-md mx-auto md:mx-0">
                                <img
                                    src="/Profilbildet.jpg"
                                    alt="Profile photo of Gaute Skaflem Lunde"
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl font-extrabold tracking-tight">
                                Gaute Skaflem Lunde
                            </h1>
                            <p className="text-sm text-gray-600 leading-relaxed mt-2 max-w-xl mx-auto md:mx-0">
                                Fullstack developer with focus on backend, using the .NET framework
                            </p>

                            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
                                <a
                                    href="/cv.pdf"
                                    className="inline-flex items-center rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium px-4 py-2 transition-colors"
                                    download
                                >
                                    Download PDF
                                </a>
                                <a
                                    href="/cv.pdf"
                                    target="_blank"
                                    className="inline-flex items-center rounded-md border border-emerald-600 text-emerald-700 hover:bg-emerald-50 text-sm font-medium px-4 py-2 transition-colors"
                                >
                                    Open Full
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* CV Section */}
                    <div className="relative border border-emerald-200 rounded-xl overflow-hidden bg-white shadow-sm">
                        <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500 pointer-events-none select-none">
                            <span className="animate-pulse">Loading CV preview...</span>
                        </div>
                        <object
                            data="/cv.pdf"
                            type="application/pdf"
                            className="w-full h-[70vh] relative z-10"
                        >
                            <div className="p-6 text-center">
                                <p className="text-sm mb-4">
                                    PDF preview not supported in this browser.
                                </p>
                                <a
                                    href="/cv.pdf"
                                    target="_blank"
                                    className="inline-block rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium px-4 py-2 transition-colors"
                                >
                                    Open CV
                                </a>
                            </div>
                        </object>
                    </div>
                
            </div>
        </main>
    );
}