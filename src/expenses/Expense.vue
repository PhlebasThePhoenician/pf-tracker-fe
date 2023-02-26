<script setup lang="ts">
</script>
<template>
    <h2>New expense</h2>
    <table>
        <tr>
            <th>sum:</th><td><input type="text" /></td>
        </tr>
        <tr>
            <th>Payment method</th><td><select name="paymentMethod">
                <option value="bogus">place-holder</option>
            </select></td>
        </tr>
        <tr>
            <th>Type</th>
            <td><select name="expenseType">
                <option>Shop (placeholder)</option>
            </select></td>
        </tr>
        <tr>
            <th>Where</th>
            <td><input type="text"/></td>
        </tr>
        <tr>
            <td colspan="2"><button type="submit">Add</button></td>
        </tr>
        
    </table>
</template>