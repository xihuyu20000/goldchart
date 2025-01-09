# 可选的  https://ppchart.com/#/
# goldchart   
# 1 完整流程
## 1.1 点击所有图表的url时，显示 ChartDesigner.vue 
## 1.2 在ChartDesigner.vue中，点击图表的url时，显示 ChartDesigner.vue
## 1.3 在ChartDesigner.vue的onMounted中，会调用get_options(chartid)，根据chartid会调用对应的图表的js文件中的特定函数
## 1.4 在函数中，加载后台的数据，并把config、option保存到pinia的global中
## 1.5 设计器中的配置项，会读取pinia的global中的config、option，当option更新时，ChartViewer会监控option的变化，随时更新图表。