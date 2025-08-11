<script>
    let {onPinTask,onArchiveTask} = $props();


    let task = {
      id: '',
      title: '',
      state: '',
    };
  </script>
  
  <div class="list-item">
    <label for="title" aria-label={task.title}>
      <input type="text" value={task.title} name="title" readonly />
    </label>
  </div>