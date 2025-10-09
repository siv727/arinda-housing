export default function OrangeHatCard( { children }) {
    return (
        <div class = "w-[500px] bg-white border rounded-2xl overflow-hidden relative">
            <div class="absolute top-0 left-0 right-0 h-2  bg-[#F35E27] pointer-events-none"></div>
            {children}
        </div>
    )
}   