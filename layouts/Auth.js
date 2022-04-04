export default function Auth({children}) {
    return (
        <>
            <section className="relative w-full h-full py-40 min-h-screen">
                <div
                    className="absolute top-0 w-full h-full bg-no-repeat bg-full"
                    style={{
                        backgroundColor: "var(--primary-color)",
                    }}
                />
                {children}
            </section>
        </>
    );
}
