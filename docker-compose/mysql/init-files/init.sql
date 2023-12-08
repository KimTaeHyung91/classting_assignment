CREATE TABLE `user`
(
    `id`         int                       NOT NULL AUTO_INCREMENT,
    `user_token` varchar(255)              NOT NULL,
    `user_name`  varchar(255)              NOT NULL,
    `email`      varchar(255)              NOT NULL,
    `password`   varchar(255)              NOT NULL,
    `role`       enum ('STUDENT', 'ADMIN') NOT NULL,
    `created_at` timestamp(6)              NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` timestamp(6)              NULL     DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `deleted_at` timestamp(6)              NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB