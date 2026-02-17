document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    const submissionTable = document.getElementById("submissionTable");
    const emptyState = document.getElementById("emptyState");

    // Load submissions when page loads
    renderSubmissions();

    // FORM SUBMIT
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const newEntry = {
            name: document.getElementById("name").value,
            contact: document.getElementById("contactNo").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
        };

        const storedData = JSON.parse(localStorage.getItem("portfolioMessages")) || [];
        storedData.push(newEntry);
        localStorage.setItem("portfolioMessages", JSON.stringify(storedData));

        // UI Feedback: Reset form and refresh table
        contactForm.reset();
        renderSubmissions();
        
        // Optional: Trigger a simple success alert or animation here
    });

    // RENDER FUNCTION (Optimized for Web & Mobile UI)
    function renderSubmissions() {
        const storedData = JSON.parse(localStorage.getItem("portfolioMessages")) || [];
        submissionTable.innerHTML = "";

        if (storedData.length === 0) {
            emptyState.classList.remove("hidden");
            return;
        }

        emptyState.classList.add("hidden");

        // Show newest first for better User Experience (UX)
        storedData.slice().reverse().forEach((data, index) => {
            const originalIndex = storedData.length - 1 - index;
            const initials = data.name.charAt(0).toUpperCase();

            const row = `
                <tr class="hover:bg-blue-50/40 transition-all duration-200 border-b border-gray-50 last:border-0 group">
                    
                    <td class="px-4 py-4">
                        <div class="flex items-center gap-3">
                            <div class="hidden sm:flex w-9 h-9 rounded-full bg-blue-600 text-white items-center justify-center font-bold text-xs shadow-sm">
                                ${initials}
                            </div>
                            <div class="flex flex-col">
                                <div class="font-bold text-slate-800 text-sm">${data.name}</div>
                                <div class="text-[11px] text-gray-400 flex flex-col sm:flex-row sm:gap-2">
                                    <span>${data.email}</span>
                                    <span class="hidden sm:inline text-gray-200">|</span>
                                    <span>${data.contact}</span>
                                </div>
                                <div class="text-[10px] text-gray-300 mt-1 uppercase tracking-tighter font-medium">${data.date}</div>
                            </div>
                        </div>
                    </td>

                    <td class="px-4 py-4 text-sm text-gray-600">
                        <p class="max-w-xs line-clamp-2 md:line-clamp-1 leading-relaxed">
                            ${data.message}
                        </p>
                    </td>

                    <td class="px-4 py-4 text-right">
                        <button onclick="deleteEntry(${originalIndex})"
                            class="text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all p-2 rounded-lg"
                            aria-label="Delete Submission"
                            title="Delete Entry">
                            <i class="fa-solid fa-trash-can text-xs"></i>
                        </button>
                    </td>

                </tr>
            `;

            submissionTable.insertAdjacentHTML("beforeend", row);
        });
    }

    // DELETE FUNCTION
    window.deleteEntry = function (index) {
        // Confirmation is good UX to prevent accidental deletes
        if(confirm("Are you sure you want to delete this UI inquiry?")) {
            const storedData = JSON.parse(localStorage.getItem("portfolioMessages")) || [];
            storedData.splice(index, 1);
            localStorage.setItem("portfolioMessages", JSON.stringify(storedData));
            renderSubmissions();
        }
    };
});