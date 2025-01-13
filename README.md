# 可选的  https://ppchart.com/#/
# fineBI抄袭的是superset
# goldchart   
# 1 完整流程
## 1.1 点击所有图表的url时，显示 ChartDesigner.vue 
## 1.2 在ChartDesigner.vue中，点击图表的url时，显示 ChartDesigner.vue
## 1.3 先执行useGlobalStore()，对globalStore.config和globalStore.option进行初始化
## 1.4 先调用getChartWrapper获得具体的IChart。里面有很重要的函数protect()，后面会调用。
## 1.5 然后执行ChartDesigner.vue的onMounted函数，其过程后面详述
## 1.6 watch(globalStore.config) 当config变化时，调用IChart.protest()将config转为option，最后renderChart()
## 1.7 watch(globalStore.option) 当option变化时，执行renderChart()

# 2 ChartDesigner.vue的onMounted()执行流程
## 2.1 初始化echart
## 2.2 根据current_ins是否为空，判断是否新建图表还是已有的图表
如果current_ins是空，调用IChart的get_option()函数，获得默认的echart配置参数，设置globalStore.setOption()，此时echart会显示默认图像
如果current_ins不空，异步调用renderChart()函数，此时使用ins的option显示图像。
## 2.3 加载所有的dataset列表，让用户切换数据集