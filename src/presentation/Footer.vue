<template>
    <div id = "container-footer">
        <div id = "footer-div">
            <p>
                Powered by 
                <a href="https://www.nutritionix.com">
                    Nutritionix
                </a>
                <br>
                Icons made by 
                <a href="https://www.flaticon.com/authors/freepik">
                    Freepic
                </a> 
                from 
                <a href="https://www.flaticon.com">
                    Flaticon
                </a>
            </p>
        </div>
    </div>
</template>


<script>
export default {

}
</script>

<style scoped>
    #container-footer {
        background-color: gainsboro;
        position: absolute;
        bottom: 0;
        height: 60px;
        width: 100%;
    }

    #footer-div {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    p {
        text-align: center;
        font-size: 0.8em;
    }

    a:link,
    a:hover,
    a:visited {
        text-decoration: none;
        color: gray;
    }
</style>