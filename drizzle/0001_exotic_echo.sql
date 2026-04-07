CREATE TABLE `calendar_notes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`date` varchar(10) NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` text,
	`color` varchar(20) NOT NULL DEFAULT 'default',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `calendar_notes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `date_selections` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`startDate` varchar(10) NOT NULL,
	`endDate` varchar(10) NOT NULL,
	`label` varchar(255),
	`color` varchar(20) NOT NULL DEFAULT 'default',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `date_selections_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `calendar_notes` ADD CONSTRAINT `calendar_notes_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `date_selections` ADD CONSTRAINT `date_selections_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;