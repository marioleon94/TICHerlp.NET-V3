<template>
  <!-- Header -->
  <div class="relative bg-emerald-600 md:pt-32 pb-32 pt-12">
    <div class="px-4 md:px-10 mx-auto w-full">
      <div>
        <!-- Card stats -->
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
                statSubtitle="Total de Tickets"
                :statTitle="totalTickets"
                statArrow="up"
                statPercent="0"
                statIconName="far fa-chart-bar"
                statIconColor="bg-red-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
                statSubtitle="Tickets prioridad baja"
                :statTitle="ticketsByPriority"
                statArrow="up"
                statPercent="0"
                statIconName="fas fa-chart-pie"
                statIconColor="bg-orange-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
                statSubtitle="Tickets abiertos"
                :statTitle="ticketsByStatus"
                statArrow="down"
                statPercent="0"
                statIconName="fas fa-users"
                statIconColor="bg-pink-500"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardStats from "@/components/Cards/CardStats.vue";
import { getAllTotalTicket, getPriorityCount, getStatusCount } from "@/services/headerStatus.service";

export default {
  components: {
    CardStats,
  },
  data() {
    return {
      totalTickets: 0,
      ticketsByPriority: 0,
      ticketsByStatus: 0
    };
  },
  async mounted() {
    await this.fetchTicketStats();
  },
  methods: {
    async fetchTicketStats() {
      try {
        const totalCount = await getAllTotalTicket();
        this.totalTickets = totalCount.total_count;

        const priorityCount = await getPriorityCount();
        this.ticketsByPriority = priorityCount[0]?.count

        const statusCount = await getStatusCount();
        this.ticketsByStatus = statusCount[0]?.count
      } catch (error) {
        console.error("Error fetching ticket stats:", error);
      }
    }
  },
};
</script>
