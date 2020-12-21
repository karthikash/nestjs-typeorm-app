import { Controller, Get, Injectable } from '@nestjs/common';
import { DiskHealthIndicator, DNSHealthIndicator, HealthCheck, HealthCheckService, MemoryHealthIndicator, TypeOrmHealthIndicator } from '@nestjs/terminus';

@Controller('health')
@Injectable()
export class HealthController {
    constructor(
        private dns: DNSHealthIndicator,
        private health: HealthCheckService,
        private typeorm: TypeOrmHealthIndicator,
        private memory: MemoryHealthIndicator,
        private disk: DiskHealthIndicator,
    ) { }

    @Get()
    @HealthCheck()
    healthCheck() {
        return this.health.check([
            () => this.dns.pingCheck('ping', 'https://google.co.in'),
            () => this.disk.checkStorage('storage', { thresholdPercent: 0.75, path: 'D:\projects\club-hr' }),
            () => this.memory.checkRSS('rss', 500 * 1024 * 1024),
            () => this.memory.checkHeap('heap', 100 * 1024 * 1024),
            () => this.typeorm.pingCheck('database', { timeout: 200 }),
        ]);
    }
}