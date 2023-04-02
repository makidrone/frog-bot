import { SlashCommandBuilder } from "@discordjs/builders";
import { GuildMember } from "discord.js";
import { Categories, Command } from "../../command";
import { MusicQueue } from "../../services/music-queue";

export const SkipCommand: Command = {
	category: Categories.music,
	command: new SlashCommandBuilder()
		.setName("skip")
		.setDescription("⏭️ skip current song in vc"),
	onInteraction: async interaction => {
		const member = interaction.member as GuildMember;
		const channel = member.voice.channel;

		if (channel == null) {
			interaction.reply("aw ribbit... you need to be in a voice channel");
			return;
		}

		try {
			MusicQueue.instance.skipCurrentSong(channel);
			await interaction.reply("⏭️ ribbit, skipped current song");
		} catch (error) {
			await interaction.reply("aw ribbit, couldn't skip current song");
		}
	},
};
