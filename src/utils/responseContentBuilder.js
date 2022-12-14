class ResponseContentBuilder {
    static getRequestQuestResponse(data) {
        let response = '';
        for (let quest of data.Responses.RANK_C_QUESTS) { //FIXME MIGHT BE QUESTS OF ANOTHER RANK
            response += `(${quest.QUEST_ID}) - ${quest.title} - ${quest.description}\n`;
            response += `Reward: ${quest.mission_reward}\n`;
            response += `Skill check: ${quest.skill_check}\n`;
            response += '\n';
        }
        return response;
    }

    static getAcceptQuestResponse(item, skillCheckValue) {
        let response = '';
        if (item.s_check > skillCheckValue) {
            return "**Failure**\n" +
                item.f_text +
                `\nReward: ${item.f_reward}\n`
        }

        if (item.gs_check > skillCheckValue) {
            return "**Success**\n" +
                item.s_text +
                `\nReward: ${item.s_reward}\n`
        }

        return "**Great Success**\n" +
            item.gs_text +
            `\nReward: ${item.gs_reward}\n`
    }
}

module.exports = ResponseContentBuilder