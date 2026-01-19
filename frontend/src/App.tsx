import React from 'react';
import { ChatWindow } from './components/ChatWindow';

function App() {
    return (
        <div className="relative min-h-screen bg-zinc-950 overflow-hidden flex items-center justify-center p-0 md:p-4">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />

            <div className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-center">
                <ChatWindow />
            </div>
        </div>
    );
}

export default App;
