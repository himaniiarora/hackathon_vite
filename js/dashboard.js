let salesChart;

// Sample data
const tableData = [
  { date: '2025-01-05', product: 'Laptop', category: 'Electronics', amount: 1200 },
  { date: '2025-01-10', product: 'Chair', category: 'Furniture', amount: 150 },
  { date: '2025-02-12', product: 'Headphones', category: 'Accessories', amount: 80 },
  { date: '2025-03-10', product: 'Phone', category: 'Electronics', amount: 700 },
  { date: '2025-03-25', product: 'Desk', category: 'Furniture', amount: 200 },
  { date: '2025-04-02', product: 'Mouse', category: 'Accessories', amount: 40 },
  { date: '2025-05-11', product: 'Monitor', category: 'Electronics', amount: 300 },
  { date: '2025-05-20', product: 'Keyboard', category: 'Accessories', amount: 60 },
  { date: '2025-06-05', product: 'Tablet', category: 'Electronics', amount: 400 },
  { date: '2025-06-15', product: 'Lamp', category: 'Furniture', amount: 50 }
];

// Filter table data by category
function getFilteredData(category){
  if(category === 'all') return tableData;
  return tableData.filter(row => row.category === category);
}

// Render chart
function renderChart(category){
  const filtered = getFilteredData(category);
  const months = ['Jan','Feb','Mar','Apr','May','Jun'];

  const salesByMonth = months.map(m => 
    filtered.filter(r => new Date(r.date).toLocaleString('en-US',{month:'short'}) === m)
            .reduce((sum,r)=>sum+r.amount,0)
  );

  const ordersByMonth = months.map(m => 
    filtered.filter(r => new Date(r.date).toLocaleString('en-US',{month:'short'}) === m).length
  );

  const ctx = document.getElementById('salesChart').getContext('2d');
  if(salesChart) salesChart.destroy();
  salesChart = new Chart(ctx, {
    type:'bar',
    data:{
      labels: months,
      datasets: [
        { label:'Sales ($)', data: salesByMonth, backgroundColor:'rgba(59,130,246,0.7)' },
        { label:'Orders', data: ordersByMonth, backgroundColor:'rgba(16,185,129,0.7)' }
      ]
    },
    options:{
      responsive:true,
      plugins:{
        tooltip: { enabled:true },
        legend: { position:'top' }
      }
    }
  });

  // Update summary cards
  document.getElementById('totalSales').textContent = `$${filtered.reduce((sum,r)=>sum+r.amount,0)}`;
  document.getElementById('totalOrders').textContent = filtered.length;
  document.getElementById('inventoryItems').textContent = 300; // Static inventory for demo
}

// Render table
function renderTable(category) {
  const tbody = document.querySelector('#salesTable tbody');
  const filtered = getFilteredData(category);
  tbody.innerHTML = '';
  if(filtered.length===0){
    tbody.innerHTML='<tr><td colspan="4" class="no-records">No records found</td></tr>';
  } else {
    filtered.forEach(row=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${row.date}</td><td>${row.product}</td>
                      <td><span class="category-badge ${row.category.toLowerCase()}">${row.category}</span></td>
                      <td>$${row.amount}</td>`;
      tbody.appendChild(tr);
    });
  }
}

// Logout
document.getElementById('logoutBtn').addEventListener('click', ()=>{
  firebase.auth().signOut().then(()=>{ window.location='index.html'; });
});

// Initialize
window.onload = function(){
  renderChart('all');
  renderTable('all');

  document.getElementById('categoryFilter').addEventListener('change', e=>{
    const cat = e.target.value;
    renderChart(cat);
    renderTable(cat);
  });
};
