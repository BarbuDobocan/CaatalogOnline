package com.example.demo.service.BackupDB;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Configuration
@EnableScheduling
public class DBAutoBackupController {

  //  @Scheduled(cron = "0 30 1 * * ?")
    public void schedule() {

        System.out.println("Backup Started at " + new Date());

        Date backupDate = new Date();
        SimpleDateFormat format = new SimpleDateFormat("dd-MM-yyyy");
        String backupDateStr = format.format(backupDate);
        String dbNameList = "licenta";

        String fileName = "Anul_Scolar"; // default file name
        String folderPath = "C:\\LicentaBackUp";
        File f1 = new File(folderPath);
        f1.mkdir(); // create folder if not exist

        String saveFileName = fileName + "_" + backupDateStr + ".sql";
        String savePath = folderPath + File.separator + saveFileName;

      //  String executeCmd = "mysqldump -u root -p root licenta1 > liceta1.sql";

//        String executeCmd = "mysqldump -u " + " root " + " -p" + " root " + "  --databases " + dbNameList
//                + " -r " + savePath;

        String executeCmd = "C:/Program Files/MySQL/MySQL Server 8.0/bin/mysqldump.exe" +
                          " root " + " -p" + " root " + "  --databases " + dbNameList
                          + " -r " + savePath;
        Process runtimeProcess = null;
        try {
            runtimeProcess = Runtime.getRuntime().exec(executeCmd);

//          Runtime runtimeProcess = Runtime.getRuntime();
//          runtimeProcess.exec("C:/Program Files/MySQL/MySQL Server 8.0/bin/mysqldump.exe" +
//                  " root " + " -p" + " root " + "  --databases " + dbNameList
//                  + " -r " + savePath );

        } catch (IOException e) {
            e.printStackTrace();
        }
//        int processComplete = 0;
//        try {
//            processComplete = runtimeProcess.waitFor();
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }
//
//        if (processComplete == 0) {
//            System.out.println("Backup Complete at " + new Date());
//        } else {
//            System.out.println("Backup Failure");
//        }
    }
}
