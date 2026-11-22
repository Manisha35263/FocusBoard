import React, { useEffect, useMemo, useState } from 'react';

const starterTasks = [
  {id:1,title:'Review project requirements',description:'Go through the assignment brief and list the important deliverables.',category:'Planning',status:'In progress',priority:'High',dueDate:'2026-11-22'},
  {id:2,title:'Create dashboard wireframe',description:'Plan the layout for the main dashboard and task cards.',category:'Design',status:'Completed',priority:'Medium',dueDate:'2026-11-20'},
  {id:3,title:'Build reusable task components',description:'Create reusable components for task items and summary cards.',category:'Development',status:'To do',priority:'High',dueDate:'2026-11-24'},
  {id:4,title:'Add search and filters',description:'Allow tasks to be searched and filtered by status and priority.',category:'Development',status:'To do',priority:'Medium',dueDate:'2026-11-25'},
  {id:5,title:'Test mobile responsiveness',description:'Check the dashboard at mobile, tablet and desktop widths.',category:'Testing',status:'In progress',priority:'Low',dueDate:'2026-11-26'},
  {id:6,title:'Prepare project documentation',description:'Write setup instructions and explain the state management approach.',category:'Documentation',status:'To do',priority:'Low',dueDate:'2026-11-27'}
];
const notes = [
  {tag:'FOCUS TIP 01',title:'Make progress, not perfection.',body:'Break a big task into small steps. A little progress every day adds up.',icon:'✦'},
  {tag:'FOCUS TIP 02',title:'Give your attention one home.',body:'Choose one important task and give it your full attention before switching.',icon:'◉'},
  {tag:'FOCUS TIP 03',title:'Celebrate completed work.',body:'Take a moment to recognize what you finished. Then plan your next step.',icon:'✓'}
];
const emptyForm = {title:'',description:'',category:'Personal',status:'To do',priority:'Medium',dueDate:''};

export default function App(){
  const [tasks,setTasks] = useState(()=>{try{const saved=localStorage.getItem('focusboard-tasks');return saved?JSON.parse(saved):starterTasks;}catch{return starterTasks;}});
  const [activeTab,setActiveTab] = useState('All');
  const [search,setSearch] = useState('');
  const [priorityFilter,setPriorityFilter] = useState('All priorities');
  const [slide,setSlide] = useState(0);
  const [modal,setModal] = useState(false);
  const [editing,setEditing] = useState(null);
  const [form,setForm] = useState(emptyForm);
  const [error,setError] = useState('');
  const [notice,setNotice] = useState('');
  useEffect(()=>{localStorage.setItem('focusboard-tasks',JSON.stringify(tasks));},[tasks]);
  useEffect(()=>{if(!notice)return;const t=setTimeout(()=>setNotice(''),2600);return()=>clearTimeout(t);},[notice]);
  const stats = useMemo(()=>{const total=tasks.length,completed=tasks.filter(t=>t.status==='Completed').length,inProgress=tasks.filter(t=>t.status==='In progress').length;return {total,completed,inProgress,percent:total?Math.round(completed/total*100):0};},[tasks]);
  const filtered = useMemo(()=>tasks.filter(t=>(activeTab==='All'||t.status===activeTab)&& (priorityFilter==='All priorities'||t.priority===priorityFilter)&&(`${t.title} ${t.description} ${t.category}`.toLowerCase().includes(search.toLowerCase()))),[tasks,activeTab,priorityFilter,search]);
  function openCreate(){setEditing(null);setForm(emptyForm);setError('');setModal(true);}
  function openEdit(task){setEditing(task.id);setForm({title:task.title,description:task.description,category:task.category,status:task.status,priority:task.priority,dueDate:task.dueDate});setError('');setModal(true);}
  function saveTask(e){e.preventDefault();if(!form.title.trim()){setError('Please enter a task title.');return;}if(editing){setTasks(prev=>prev.map(t=>t.id===editing?{...t,...form,title:form.title.trim()}:t));setNotice('Task updated successfully.');}else{setTasks(prev=>[{...form,title:form.title.trim(),id:Date.now()},...prev]);setNotice('New task created.');}setModal(false);}
  function removeTask(id){if(window.confirm('Are you sure you want to delete this task?')){setTasks(prev=>prev.filter(t=>t.id!==id));setNotice('Task deleted.');}}
  function cycleStatus(task){const order=['To do','In progress','Completed'];const next=order[(order.indexOf(task.status)+1)%order.length];setTasks(prev=>prev.map(t=>t.id===task.id?{...t,status:next}:t));setNotice(`Status changed to ${next}.`);}
  const dateLabel=(d)=>d?new Date(`${d}T00:00:00`).toLocaleDateString('en-US',{month:'short',day:'numeric'}):'No date';
  return <div className="app-shell">
    <aside className="sidebar"><div className="brand"><span className="brand-mark">✦</span><span>focus<span className="brand-light">board</span></span></div><div className="workspace-label">WORKSPACE</div><button className="nav-item active"><span>▦</span> Overview</button><button className="nav-item" onClick={()=>setActiveTab('All')}><span>☷</span> My tasks</button><div className="side-bottom"><div className="profile"><div className="avatar">MR</div><div><b>Manisha Rupa</b><small>Personal workspace</small></div><span className="dots">•••</span></div></div></aside>
    <main className="main"><header className="topbar"><div className="crumb">Workspace <span>/</span> <b>Overview</b></div><div className="top-actions"><span className="today">✧ &nbsp;Your day, your pace</span><div className="avatar small">MR</div></div></header>
      <section className="welcome"><div><div className="eyebrow">SATURDAY, NOVEMBER 21, 2026</div><h1>Good evening, Manisha <span>✦</span></h1><p>Make space for what matters. Here's your focus at a glance.</p></div><button className="primary" onClick={openCreate}><span>＋</span> Create task</button></section>
      <section className="stats-grid">
        <div className="stat-card"><div className="stat-top"><span>Total tasks</span><span className="stat-icon purple">▤</span></div><strong>{stats.total}</strong><small>Across your workspace</small></div>
        <div className="stat-card"><div className="stat-top"><span>In progress</span><span className="stat-icon blue">◷</span></div><strong>{stats.inProgress}</strong><small>Keep the momentum going</small></div>
        <div className="stat-card"><div className="stat-top"><span>Completed</span><span className="stat-icon green">✓</span></div><strong>{stats.completed}</strong><small>Great work so far</small></div>
        <div className="stat-card progress-card"><div className="stat-top"><span>Completion rate</span><span className="stat-icon peach">↗</span></div><strong>{stats.percent}<em>%</em></strong><div className="progress-track"><div style={{width:`${stats.percent}%`}}/></div><small>Based on completed tasks</small></div>
      </section>
      <section className="focus-note"><div className="note-symbol">{notes[slide].icon}</div><div className="note-copy"><div className="note-tag">{notes[slide].tag}</div><h2>{notes[slide].title}</h2><p>{notes[slide].body}</p></div><div className="note-controls"><button aria-label="Previous focus note" onClick={()=>setSlide(s=>(s+2)%3)}>‹</button><button aria-label="Next focus note" onClick={()=>setSlide(s=>(s+1)%3)}>›</button></div><div className="note-dots">{notes.map((n,i)=><button key={n.tag} aria-label={`Go to slide ${i+1}`} className={slide===i?'selected':''} onClick={()=>setSlide(i)}/>)}</div></section>
      <section className="tasks-section"><div className="section-heading"><div><div className="eyebrow">STAY ON TRACK</div><h2>Your tasks <span className="count-pill">{filtered.length}</span></h2></div><button className="text-button" onClick={()=>{setActiveTab('All');setSearch('');setPriorityFilter('All priorities');}}>Clear filters ↗</button></div>
        <div className="toolbar"><div className="tabs">{['All','To do','In progress','Completed'].map(tab=><button key={tab} className={activeTab===tab?'tab active-tab':'tab'} onClick={()=>setActiveTab(tab)}>{tab}</button>)}</div><div className="filters"><label className="searchbox"><span>⌕</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search tasks..." aria-label="Search tasks"/></label><select value={priorityFilter} onChange={e=>setPriorityFilter(e.target.value)} aria-label="Filter by priority"><option>All priorities</option><option>High</option><option>Medium</option><option>Low</option></select></div></div>
        <div className="task-list">{filtered.length===0?<div className="empty"><div>☷</div><b>No tasks found</b><span>Try changing your search or filters.</span></div>:filtered.map(task=><article className="task-row" key={task.id}><button className={`check ${task.status==='Completed'?'checked':''}`} aria-label={`Change status for ${task.title}`} onClick={()=>cycleStatus(task)}>{task.status==='Completed'?'✓':''}</button><div className="task-main"><h3 className={task.status==='Completed'?'done':''}>{task.title}</h3><p>{task.description||'No description added.'}</p><div className="task-meta"><span className="category">{task.category}</span><span>◷ &nbsp;{dateLabel(task.dueDate)}</span></div></div><div className="task-badges"><span className={`status status-${task.status.toLowerCase().replace(' ','-')}`}>{task.status}</span><span className={`priority priority-${task.priority.toLowerCase()}`}><i/> {task.priority}</span></div><div className="task-actions"><button title="Edit task" aria-label="Edit task" onClick={()=>openEdit(task)}>✎</button><button title="Delete task" aria-label="Delete task" onClick={()=>removeTask(task.id)}>⌫</button></div></article>)}</div>
        <div className="list-footer">Showing <b>{filtered.length}</b> of <b>{tasks.length}</b> tasks <span>Tip: click the circle to cycle task status</span></div>
      </section>
      <footer>Made for meaningful progress <span>✦</span></footer>
    </main>
    {notice&&<div className="toast">✓ &nbsp;{notice}</div>}
    {modal&&<div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setModal(false);}}><form className="modal" onSubmit={saveTask}><div className="modal-head"><div><div className="eyebrow">TASK DETAILS</div><h2>{editing?'Edit task':'Create a task'}</h2></div><button type="button" className="close" onClick={()=>setModal(false)}>×</button></div><label className="field">Task title <input autoFocus value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="e.g. Prepare project presentation"/></label>{error&&<div className="error">{error}</div>}<label className="field">Description <textarea rows="3" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Add a few details about this task..."/></label><label className="field">Category <input value={form.category} onChange={e=>setForm({...form,category:e.target.value})} placeholder="e.g. Design"/></label><div className="form-grid"><label className="field">Status<select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><option>To do</option><option>In progress</option><option>Completed</option></select></label><label className="field">Priority<select value={form.priority} onChange={e=>setForm({...form,priority:e.target.value})}><option>Low</option><option>Medium</option><option>High</option></select></label></div><label className="field">Due date <input type="date" value={form.dueDate} onChange={e=>setForm({...form,dueDate:e.target.value})}/></label><div className="modal-actions"><button type="button" className="secondary" onClick={()=>setModal(false)}>Cancel</button><button className="primary" type="submit">{editing?'Save changes':'Create task'}</button></div></form></div>}
  </div>;
}
