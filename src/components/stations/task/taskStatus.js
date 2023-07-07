import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
export default function TaskStatus({ item }) {
    const [activeBadges, setActiveBadges] = useState({
        fresh: false,
        inProgress: false,
        success: false,
        overdue: false
    });
    const { fresh, inProgress, success, overdue } = activeBadges;
    useEffect(() => {
        reportBadgesStatus();
    }, [item]);
    const reportBadgesStatus = () => {
        const currentDate = new Date();
        console.log('hello Time!!!');
        const createdAt = item.createdAt.toString();
        const year = createdAt.slice(0, 4);
        const month = createdAt.slice(5, 7);
        const day = createdAt.slice(8, 10);
        const formatted = `${month.length > 1 && month[0] == 0 ? month[1] : month}/${day.length > 1 && day[0] == 0 ? day[1] : day}/${year}`;
        console.log(formatted.toLocaleLowerCase(), currentDate.toLocaleDateString());
        const initDate = formatted.toString();
        const presentDate = currentDate.toLocaleDateString().toString();
        const isNew = initDate == presentDate;
        if (isNew) {
            setActiveBadges((prev) => ({ ...prev, fresh: true }));
        }
        else if (item.date !== '' && item.date.length > 10 && !isNew) {
            const taskDueDate = new Date(item.date);
            if (taskDueDate < currentDate && !item.goalAchieved) {
                const taskDueTime = new Date(item.endTime);
                if (taskDueDate < currentDate && taskDueTime > currentDate && item.endTime !== '') {
                    console.log('CHECKING IF TASK TIME IS OVERDUE OR IN PROGRESS...');
                    console.log(taskDueTime, currentDate);
                    console.log('taskDueTime > currentDate', taskDueTime > currentDate);
                    setActiveBadges((prev) => ({ ...prev, inProgress: true, overdue: false }));
                }
                else {
                    setActiveBadges((prev) => ({ ...prev, overdue: true, inProgress: false }));
                }
            }
        }
        if (item.goalAchieved) {
            setActiveBadges((prev) => ({ success: true, inProgress: false, overdue: false, fresh: false }));
        }
    };
    return (_jsx("div", { children: _jsxs(Stack, { direction: 'row', children: [inProgress && _jsx(Badge, { colorScheme: 'orange', children: "In Progress" }), success && _jsx(Badge, { colorScheme: 'green', children: "Success" }), overdue && _jsx(Badge, { colorScheme: 'red', children: "Overdue" }), fresh && _jsx(Badge, { colorScheme: 'purple', children: "New" })] }) }));
}
