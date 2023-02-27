import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module'

@Module({
  imports: [AdminModule, EmployeeModule, TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'OBSMS',
      autoLoadEntities: true,
      synchronize: true,
    }
  ),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
