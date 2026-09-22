const API_URL = 'https://student-management-system-rxuj.onrender.com/api/students';

// 1. Page लोड झाल्यावर सर्व विद्यार्थ्यांची लिस्ट फेच करणे
document.addEventListener('DOMContentLoaded', fetchStudents);

async function fetchStudents() {
    try {
        const response = await fetch(API_URL);
        const students = await response.json();
        const tableBody = document.querySelector('tbody');
        
        if (!tableBody) return; // जर टेबल नसेल तर स्किप करा

        tableBody.innerHTML = ''; // जुना डेटा क्लिअर करा

        students.forEach(student => {
            const row = `
                <tr style="border-bottom: 1px solid #ddd;">
                    <td style="padding: 10px;">${student.rollNo}</td>
                    <td style="padding: 10px;">${student.name}</td>
                    <td style="padding: 10px;">${student.email}</td>
                    <td style="padding: 10px;">${student.class}</td>
                    <td style="padding: 10px;">
                        <button onclick="deleteStudent('${student._id}')" style="background: #c0392b; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">Delete</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error('Error fetching students:', error);
    }
}

// 2. नवीन विद्यार्थी ॲड करणे (Form Submit Event)
const studentForm = document.getElementById('student-form');
if (studentForm) {
    studentForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const inputs = studentForm.querySelectorAll('input');
        const studentData = {
            name: inputs[0].value,
            email: inputs[1].value,
            rollNo: inputs[2].value,
            class: inputs[3].value
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(studentData)
            });

            if (response.ok) {
                alert('Student added successfully!');
                studentForm.reset();
                fetchStudents(); // टेबल रिफ्रेश करा
            } else {
                alert('Failed to add student');
            }
        } catch (error) {
            console.error('Error adding student:', error);
        }
    });
}

// 3. विद्यार्थी डिलीट करणे
async function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                fetchStudents(); // टेबल रिफ्रेश करा
            }
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    }
}